venv = ./venv
bin = ${venv}/bin/

vault-password=--vault-password-file ./vault-password
env-opts=-i environments/$(env)/hosts -e @environments/$(env)/secrets

export ANSIBLE_CONFIG = ./ansible.cfg

install:
	python3 -m venv ${venv}
	${bin}pip install -U pip setuptools wheel
	${bin}pip install -r requirements.txt
	@echo $(${bin}ansible --version)

vagrant:
	cd environments/vagrant && vagrant ${CMD}

vagrant-ssh:
	make vagrant CMD="ssh -- -R 5432:localhost:5432 -L 3080:localhost:80"

ping:
	${bin}ansible ${vault-password} ${env-opts} web -m ping

secrets:
	${bin}ansible-vault edit ${vault-password} environments/$(env)/secrets

provision:
	${bin}ansible-playbook ${vault-password} ${env-opts} -t provision ./playbook.yml

deploy:
	${bin}ansible-playbook ${vault-password} ${env-opts} -t deploy ./playbook.yml
